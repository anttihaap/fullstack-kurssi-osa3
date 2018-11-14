import React from 'react'

const ContactFilter = ({ changeContactFilter }) => (
  <div>
    rajaa näytettäviä: <input onChange={changeContactFilter} />
  </div>
)

export default ContactFilter