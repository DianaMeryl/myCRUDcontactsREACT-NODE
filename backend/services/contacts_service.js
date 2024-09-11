const Contacts = require("../models/contacts_model");

async function getContacts() {
  const students = await Contacts.findAll();

  return students;
}

async function getContactsById(contactId) {
  try {
    const contact = await Contacts.findOne({
      where: { contactId },
    });

    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
  }
}

async function createContact({
  firstName,
  lastName,
  email,
  phoneNumber,
  country,
  city,
}) {
  try {
    const existingContacts = await Contacts.findOne({
      where: { firstName, lastName },
    });
    if (existingContacts) {
      throw new Error("Контакт уже існує");
    }

    const newContacts = await Contacts.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      city,
    });
    return newContacts;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
}

async function updateContact(contactId, contact) {
  await Contacts.update(contact, { where: { contactId: contactId } });
  return getContactsById(contactId);
}

async function removeContact(contactId) {
  try {
    await Contacts.destroy({
      where: {
        contactId: contactId,
      },
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}

module.exports = {
  getContacts,
  getContactsById,
  createContact,
  updateContact,
  removeContact,
};
