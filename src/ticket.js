import dateFormat from "dateformat";


export default class TicketView {
  constructor(containerEl, ticket, eventHandlers) {
    this.eventHandlers = eventHandlers;
    this.ticket = ticket;
    this.container = containerEl;
  }

  drawTicket() {
    const {name, created, id, status} = this.ticket;

    this.ticketWRP = document.createElement('div');
    this.ticketWRP.classList.add('ticketWRP');
    this.ticketWRP.dataset.id = id;

    const ticketEl = document.createElement('div');
    ticketEl.classList.add('ticket');

    const checkAndNameWRP = document.createElement('div');
    checkAndNameWRP.classList.add('checkAndNameWRP')

    const checkpoint = document.createElement('input');
    checkpoint.type = 'checkbox';
    checkpoint.checked = status;

    checkpoint.classList.add('check');
    checkpoint.addEventListener('change', this.onStatusChange.bind(this))
    checkAndNameWRP.appendChild(checkpoint);

    const nameEl = document.createElement('span');
    nameEl.classList.add('ticketName')
    nameEl.textContent = name;
    checkAndNameWRP.appendChild(nameEl)
    ticketEl.appendChild(checkAndNameWRP)

    const dataAndBtnsWRP = document.createElement('div');
    dataAndBtnsWRP.classList.add('dataAndBtnsWRP');

    const dataEl = document.createElement('span');
    dataEl.classList.add('data');
    dataEl.textContent = dateFormat(created, 'dd.mm.yy  HH:MM');
    dataAndBtnsWRP.appendChild(dataEl)

    const changeBtn = document.createElement('button');
    changeBtn.classList.add('changeBtn', 'circleBtn');
    changeBtn.addEventListener('click', this.onEditClick.bind(this))
    dataAndBtnsWRP.appendChild(changeBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn', 'circleBtn');
    removeBtn.type = 'button';
    removeBtn.textContent = '\u{2A09}';

    removeBtn.addEventListener('click', this.onDeleteClick.bind(this))

    dataAndBtnsWRP.appendChild(removeBtn)
    ticketEl.appendChild(dataAndBtnsWRP)
    this.ticketWRP.appendChild(ticketEl)
    const descriptionEl = document.createElement('span');
    descriptionEl.classList.add('descriptionTicket', 'hidden');

    this.ticketWRP.appendChild(descriptionEl);

    this.ticketWRP.addEventListener('click', this.toggleFullTicket.bind(this))
    this.container.appendChild(this.ticketWRP)
  }

  static update(ticket) {
    const {name, created, id, status, description} = ticket;
    const ticketEl = document.querySelector(`.ticketWRP[data-id='${id}']`);
    const checkEl = ticketEl.querySelector('.check');
    checkEl.checked = status;
    const nameEl = ticketEl.querySelector('.ticketName');
    nameEl.textContent = name;
    const dataEl = ticketEl.querySelector('.data');
    dataEl.textContent = dateFormat(created, 'dd.mm.yy  HH:MM');
    const descriptionEl = ticketEl.querySelector('.descriptionTicket');
    descriptionEl.textContent = description;
  }


  static remove(id) {
    const ticketEl = document.querySelector(`.ticketWRP[data-id='${id}']`);
    ticketEl.remove()
  }

  onDeleteClick() {
    this.eventHandlers.onRemoveTicket.call(this, this.ticket.id)
  }

  async onEditClick() {
    const fullTicket = await this.eventHandlers.getFullTicket.call(this, this.ticket.id)
    this.eventHandlers.onChangeTicket.call(this, fullTicket)
  }

  onChangeTicket(e, id, status, created) {
    e.preventDefault();
    const formEl = e.target.closest('.form')
    const formData = new FormData(formEl);
    formData.append('id', `${id}`);
    formData.append('status', `${status}`);
    formData.append('created', `${created}`);
    this.eventHandlers.onChangeTicket.call(this, formData)
    formEl.reset();
    formEl.closest('.changeTicketForm.absoluteContainer').style.display = 'none';
  }

  async toggleFullTicket(e) {
    if (e.target.classList.contains('check') || e.target.classList.contains('changeBtn') || e.target.classList.contains('removeBtn')) {
      return
    }
    const descriptionTextEl = this.ticketWRP.querySelector('.descriptionTicket');
    const fullTicketData = await this.eventHandlers.getFullTicket.call(this, this.ticket.id);
    if (fullTicketData.description.length === 0) {
      descriptionTextEl.textContent = 'This ticket has not description';
    } else {
      descriptionTextEl.textContent = fullTicketData.description;
    }
    this.ticketWRP.querySelector('.descriptionTicket').classList.toggle('hidden');

  }

  async onStatusChange(e) {
    const fullTicket = await this.eventHandlers.getFullTicket(this.ticket.id);
    fullTicket.status = e.target.checked;
    this.eventHandlers.onChangeTicketStatus.call(this, fullTicket)
  }

}
