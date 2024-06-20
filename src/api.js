export default class Api {
  constructor(url) {
    this.url = url;
  }

  async getTicket(id) {
    const url = this.url + `/tickets/${id}`
    const request = fetch(url)
    const result = await request;
    if(!result.ok){
      console.log('Ticket is undefined')
      return
    }
    return await result.json();
  }

  async getTicketList(){
    const url = this.url + `/tickets`;
    const request = fetch(url)
    const result = await request;
    return await result.json();
  }

  async createNewTicket(data){
    const url = this.url + `/tickets`
    const request = fetch(url,{
      method: "POST",
      headers: {
        'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    const result = await request;
    if(!result.ok){
      console.log('Ticket was not created')
      return
    }
    return await result.json();
  }

  async changeTicket(data){
    const url = this.url + `/tickets/${data.id}`;
    const request = fetch(url,{
      method: "PUT",
      headers: {
        'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    const result = await request;
    if(!result.ok){
      console.log('Ticket was not changed')
      return
    }
    return await result.json();
  }

  async deleteTicket(id){
    const url = this.url + `/tickets/${id}`;
    const request = fetch(url,{
      method: "DELETE",
      headers: {
        'Content-Type':'application/json'},
      body: JSON.stringify(id)
    })
    const result = await request;
    if(!result.ok) {
      console.log('Ticket was not deleted')
    }
    return result.ok
  }
}
