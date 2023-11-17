const program = require("commander");
const {
  getContactById,
  listContacts,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "Action (read, getById, remove, add)")
  .option("-i, --id <type>", "Contact ID")
  .option("-n, --name <type>", "Contact name")
  .option("-e, --email <type>", "Contact email")
  .option("-p, --phone <type>", "Contact phone");

program.parse();

const options = program.opts();
invokeAction(options);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await getContactById(id);
      console.log(oneContact);
      break;

    case "remove":
      const newList = await removeContact(id);
      console.log(newList || null);
      break;

    case "add":
      const addCon = await addContact(name, email, phone);
      console.log(addCon);
      break;

    default:
      console.warn("Unknown action");
  }
}

// node index.js -a list
// node index.js -a get -i "drsAJ4SHPYqZeG-83QTVW"
// node index.js -a remove -i "vza2RIzNGIwutCVCs4mCL"
// node index.js -a add -n "tyotya motya" -e "mail@motya.com" -p "+1234567890"
