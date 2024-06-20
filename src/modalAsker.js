export default class ModalAsker{
  constructor() {
    this.modal = document.querySelector('.removeTicketAsk');
    this.btnOK = this.modal.querySelector('.okBtn');
    this.btnCancel = this.modal.querySelector('.cancelModalBtn');
    this.btnOK.addEventListener('click', this.ok.bind(this));
    this.btnCancel.addEventListener('click', this.cancelModal.bind(this))

  }

  async viewModal(){
    this.container = document.querySelector('.removeTicketAskContainer.absoluteContainer');
    this.container.style.display = 'block';

    return new Promise((resolve) => {
      this.promiseResolve = resolve;
    });
  }

  ok(){
    this.container.style.display = 'none'
    this.promiseResolve(true)
  }

  cancelModal(){
    this.container.style.display = 'none'
    this.promiseResolve(false)
  }
}
