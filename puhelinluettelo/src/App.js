import React from 'react'
import AddContact from './add-contact'
import ContactFilter from './contact-filter'
import ShowContacts from './show-contacts'
import SuccessAlert from './success-alert'
import contactsService from './services/contacts'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      contactFilter: '',
      successAlertMessage: null
    }
  }

  componentDidMount() {
    contactsService.getAll().then(res => {
      this.setState({ contacts: res.data })
    })
  }

  updateContacts = contacts => {
    this.setState({ contacts })
  }

  changeContactFilter = event => {
    this.setState({ contactFilter: event.target.value })
  }

  addSuccessAlert = successAlertMessage => {
    this.setState({ successAlertMessage })
    setTimeout(() => {
      this.setState({ successAlertMessage: null })
    }, 2000)
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        {this.state.successAlertMessage && (
          <SuccessAlert message={this.state.successAlertMessage} />
        )}
        <ContactFilter
          changeContactFilter={this.changeContactFilter.bind(this)}
        />
        <AddContact
          contacts={this.state.contacts}
          updateContacts={this.updateContacts.bind(this)}
          addSuccessAlert={this.addSuccessAlert.bind(this)}
        />
        <ShowContacts
          contacts={this.state.contacts}
          filter={this.state.contactFilter}
          updateContacts={this.updateContacts.bind(this)}
        />
      </div>
    )
  }
}

export default App
