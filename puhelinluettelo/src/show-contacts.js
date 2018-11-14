import React from 'react'
import contactsService from './services/contacts'

class ShowContacts extends React.Component {

  deleteContact = contact => {
    if (window.confirm(`poisetaanko ${contact.name}`))
      contactsService.del(contact.id).then(() => {
        contactsService.getAll().then(res => {
          this.props.updateContacts(res.data)
        })
      })
  }

  render() {
    if (this.props.contacts.length === 0) {
      return <p>Puhelinluettelo on tyhjä.</p>
    }

    const filteredContacts = this.props.contacts.filter(contact =>
      contact.name.toUpperCase().includes(this.props.filter.toUpperCase())
    )

    return (
      <div>
        <h2>Numerot</h2>
        {filteredContacts.map(person => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => this.deleteContact(person)}>poista</button>
          </div>
        ))}
      </div>
    )
  }
}

export default ShowContacts
