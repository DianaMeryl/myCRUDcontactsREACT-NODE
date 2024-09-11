const ContactsService = require("../services/contacts_service");

async function getAllContacts(req, res) {
  const contacts = await ContactsService.getContacts();
  return res.json(contacts);
}

async function getOneContact(req, res) {
  // const { contactId } = req.params;
  const contactId = parseInt(req.params.contactId, 10);
  const contactById = await ContactsService.getContactsById(contactId);
  return res.json(contactById);
}

async function addContact(req, res) {
  const { firstName, lastName, email, phoneNumber, country, city } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !country || !city) {
    return res.status(400).json({ error: "all data are required" });
  }
  try {
    const newContact = await ContactsService.createContact({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      city,
    });
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    if (err.message === "Контакт уже існує") {
      res.status(409).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Не вдалося додати контакт" });
    }
  }
}

async function updateOneContact(req, res) {
  const { contactId } = req.params;
  const { firstName, lastName, email, phoneNumber, country, city } = req.body;

  try {
    const newContact = await ContactsService.updateContact(contactId, {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      city,
    });

    res.status(200).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не вдалося оновити контакт" });
  }
}

async function deleteOneContact(req, res) {
  const { contactId } = req.params;

  try {
    await ContactsService.removeContact(contactId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Не вдалося видалити контакт" });
  }
}

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  updateOneContact,
  deleteOneContact,
};
