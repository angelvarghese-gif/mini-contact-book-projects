import React, { useState } from "react";

function ContactBook() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "9123456780",
      email: "jane@example.com",
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");

  // Add form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Edit form
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Different colors for initials
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFCC5C",
    "#9B59B6",
    "#3498DB",
    "#E67E22",
  ];

  // Generate initials
  const getInitials = (name) => {
    if (!name) return "?";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Give each contact a color based on ID
  const getColor = (id) => {
    return colors[id % colors.length];
  };

  // Handle add form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add contact
  const addContact = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please enter name and phone number.");
      return;
    }

    const newContact = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    setContacts([...contacts, newContact]);

    setFormData({
      name: "",
      phone: "",
      email: "",
    });
  };

  // Delete contact
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));

    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
    }

    if (editingId === id) {
      setEditingId(null);
    }
  };

  // Start editing
  const startEditing = (contact) => {
    setEditingId(contact.id);

    setEditData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated contact
  const updateContact = (e) => {
    e.preventDefault();

    if (!editData.name || !editData.phone) {
      alert("Name and phone number are required.");
      return;
    }

    const updatedContacts = contacts.map((contact) =>
      contact.id === editingId
        ? {
            ...contact,
            name: editData.name,
            phone: editData.phone,
            email: editData.email,
          }
        : contact
    );

    setContacts(updatedContacts);

    // Update selected contact too
    const updatedContact = updatedContacts.find(
      (contact) => contact.id === editingId
    );

    if (selectedContact?.id === editingId) {
      setSelectedContact(updatedContact);
    }

    setEditingId(null);

    setEditData({
      name: "",
      phone: "",
      email: "",
    });
  };

  // Search contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sidebar
  const sidebarColumn = (
    <div
      style={{
        width: "320px",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginTop: 0 }}>📱 Contact Book</h2>

      <input
        type="text"
        placeholder="🔍 Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
      />

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              marginBottom: "10px",
              backgroundColor:
                selectedContact?.id === contact.id ? "#e2e8f0" : "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {/* Initial circle */}
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: getColor(contact.id),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "12px",
                flexShrink: 0,
              }}
            >
              {getInitials(contact.name)}
            </div>

            {/* Contact information */}
            <div>
              <strong>{contact.name}</strong>

              <br />

              <span
                style={{
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                {contact.phone}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Main content
  const mainColumn = (
    <div
      style={{
        flex: 1,
        padding: "30px",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <h1>My Contacts</h1>

      {/* Selected contact */}
      {selectedContact ? (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "30px",
            backgroundColor: "#fff",
          }}
        >
          {/* Initial circle */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: getColor(selectedContact.id),
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            {getInitials(selectedContact.name)}
          </div>

          <h2>{selectedContact.name}</h2>

          <p>
            <strong>📞 Phone:</strong> {selectedContact.phone}
          </p>

          <p>
            <strong>📧 Email:</strong>{" "}
            {selectedContact.email || "No email provided"}
          </p>

          <button
            onClick={() => startEditing(selectedContact)}
            style={{
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => deleteContact(selectedContact.id)}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🗑️ Delete
          </button>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <p>Select a contact from the left side.</p>
        </div>
      )}

      {/* Edit form */}
      {editingId !== null && (
        <div
          style={{
            border: "2px solid #ffc107",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "500px",
            marginBottom: "30px",
            backgroundColor: "#fffdf2",
          }}
        >
          <h2>✏️ Edit Contact</h2>

          <form onSubmit={updateContact}>
            <div style={{ marginBottom: "15px" }}>
              <label>
                <strong>Name</strong>
              </label>

              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>
                <strong>Phone</strong>
              </label>

              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>
                <strong>Email</strong>
              </label>

              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              💾 Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Add contact form */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "500px",
        }}
      >
        <h2>➕ Add New Contact</h2>

        <form onSubmit={addContact}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              <strong>Name</strong>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <strong>Phone</strong>
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <strong>Email</strong>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ➕ Add Contact
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "sans-serif",
        margin: 0,
      }}
    >
      {sidebarColumn}
      {mainColumn}
    </div>
  );
}

export default ContactBook;