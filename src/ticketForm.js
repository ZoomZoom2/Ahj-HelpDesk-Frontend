export default class TicketForm {

  constructor() {
    this.formEl = document.querySelector('.form');
    this.formEl.addEventListener('submit', this.onSubmit.bind(this));
    this.cancelEl = this.formEl.querySelector('.cancelModalBtn');
    this.cancelEl.addEventListener('click', this.closeModal.bind(this));
  }

  async editTicket(ticketData) {
    let {id, name, description} = ticketData;
    this.ticketData = ticketData;

    this.formAbsoluteContainer = document.querySelector('.addNewTicketForm.absoluteContainer');
    this.formAbsoluteContainer.style.display = 'block';
    const modalTitleEl = this.formEl.querySelector('.modalTitle');
    if (id) {
      modalTitleEl.textContent = 'Change ticket';
      const nameEl = this.formEl.querySelector('.nameInput');
      nameEl.value = name;
      const descriptionEl = this.formEl.querySelector('.descriptionInput');
      descriptionEl.value = description;
    } else {
      modalTitleEl.textContent = 'Add new ticket';
    }

    return new Promise((resolve) => {
      this.promiseResolve = resolve;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.formEl);
    const {name, description} = Object.fromEntries(formData.entries());
    this.formAbsoluteContainer.style.display = 'none';
    this.formEl.reset()
    this.promiseResolve({...this.ticketData, name, description});
  }

  closeModal() {
    this.formAbsoluteContainer.style.display = 'none';
    this.formEl.reset()
    this.promiseResolve(null);
  }
}
