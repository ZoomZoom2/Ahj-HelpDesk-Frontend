import TicketView from "./ticket";
import TicketForm from "./ticketForm";
import ModalAsker from "./modalAsker";

export class Controller {
  constructor(api) {
    this.api = api;
    // noinspection JSIgnoredPromiseFromCall
    this.loadData();
    this.form = new TicketForm();
    this.modalAsker = new ModalAsker();
  }

  async loadData() {
    const tickets = await this.api.getTicketList();
    for (const ticketData of tickets) {
      const ticket = this.createTicketView(ticketData)

      ticket.drawTicket()
    }
  }

  createTicketView(ticketData){
    return new TicketView(this.ticketsContainer, ticketData, {
      onChangeTicket: this.onChangeTicket.bind(this),
      onRemoveTicket: this.onRemoveTicket.bind(this),
      onChangeTicketStatus: this.onChangeTicketStatus.bind(this),
      getFullTicket:this.getFullTicket.bind(this)
    });
 }

  addListeners() {
    this.ticketsContainer = document.querySelector('.ticketsContainer');
    const addTicketBtn = document.querySelector('.addTicketBtn');

    addTicketBtn.addEventListener('click', async () => {
      const newTicketData = await this.form.editTicket({status:false});
      if (!newTicketData) return
       await this.createNewTicket(newTicketData)
    })

  }

  async getFullTicket(id){
    return await this.api.getTicket(id);
  }
  async createNewTicket(ticketData) {
    const newData = await this.api.createNewTicket(ticketData);
    const ticket = this.createTicketView(newData)
    ticket.drawTicket();
  }

  async onChangeTicket(ticketData) {
    let newTicketData = await this.form.editTicket(ticketData);
    if (!newTicketData) return
    newTicketData = await this.api.changeTicket(newTicketData);
    TicketView.update(newTicketData)
  }

  async onRemoveTicket(id) {
    const answer = await this.modalAsker.viewModal();
    if(!answer) return;

    const result = await this.api.deleteTicket(id)
    if (result) TicketView.remove(id)
  }

  async onChangeTicketStatus(ticketData) {
    const newTicketData = await this.api.changeTicket(ticketData);
    TicketView.update(newTicketData)
  }

}
