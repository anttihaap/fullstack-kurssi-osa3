import React from 'react'
import contactsSerive from './services/contacts'

class AddContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newName: '',
      newNumber: ''
    }
    this.updateContacts = this.props.updateContacts
  }

  createContact = newContact => {
    return contactsSerive.create(newContact).then(res => {
      this.updateContacts(this.props.contacts.concat(res.data))
    })
  }

  handleAddPerson = event => {
    event.preventDefault()
    const newContact = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const personWithSameName = this.props.contacts.find(
      person => person.name === newContact.name
    )
    if (!personWithSameName) {
      this.createContact(newContact).then(() => {
        this.props.addSuccessAlert(`lisättiin ${newContact.name}`)
      })
    } else {
      if (
        window.confirm(
          `${newContact.name} on jo luettelossa, korvataanko numero uudella?`
        )
      ) {
        const updatedContact = {
          name: newContact.name,
          number: newContact.number,
          id: personWithSameName.id
        }
        contactsSerive
          .update(personWithSameName.id, updatedContact)
          .then(res => {
            const updatedContacts = this.props.contacts.map(contact =>
              contact.id === personWithSameName.id
                ? { ...contact, number: newContact.number }
                : contact
            )
            this.updateContacts(updatedContacts)
            this.props.addSuccessAlert(`muokattiin ${newContact.name}`)
          })
          .catch(err => {
            this.createContact(updatedContact)
          })
      }
    }
    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = event => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.handleAddPerson}>
          <div>
            nimi:{' '}
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero:{' '}
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddContact
