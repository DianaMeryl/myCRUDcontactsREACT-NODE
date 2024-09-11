const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  addContact,
  updateOneContact,
  deleteOneContact,
} = require("../controllers/contacts_controller");

router.get("/contacts", getAllContacts);
router.get("/contacts/:contactId", getOneContact);
router.post("/contacts", addContact);
router.put("/contacts/:contactId", updateOneContact);
router.delete("/contacts/:contactId", deleteOneContact);

module.exports = router;
