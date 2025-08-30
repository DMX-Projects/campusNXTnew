import React, { useState, useEffect } from "react";

interface Contact {
    id: number;
    name: string;
    phone: string;
    lastUsed: Date;
    messageCount: number;
}

interface MessageTemplate {
    id: number;
    name: string;
    content: string;
    category: 'business' | 'personal' | 'marketing' | 'support';
}

const SendWhatsApp: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
    const [showContacts, setShowContacts] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [newContactName, setNewContactName] = useState("");
    const [showAddContact, setShowAddContact] = useState(false);
    const [messageHistory, setMessageHistory] = useState<Array<{ phone: string, message: string, timestamp: Date }>>([]);
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkNumbers, setBulkNumbers] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [useSchedule, setUseSchedule] = useState(false);

    // Sample templates
    useEffect(() => {
        const defaultTemplates: MessageTemplate[] = [
            {
                id: 1,
                name: "Business Greeting",
                content: "Hello! Thank you for your interest in our services. How can we help you today?",
                category: 'business'
            },
            {
                id: 2,
                name: "Follow Up",
                content: "Hi! Just following up on our previous conversation. Do you have any questions?",
                category: 'business'
            },
            {
                id: 3,
                name: "Meeting Reminder",
                content: "Friendly reminder about our meeting scheduled for today. Looking forward to connecting!",
                category: 'business'
            },
            {
                id: 4,
                name: "Thank You",
                content: "Thank you for your business! We appreciate your trust in our services.",
                category: 'business'
            },
            {
                id: 5,
                name: "Birthday Wish",
                content: "🎉 Happy Birthday! Hope you have a wonderful day filled with joy and happiness! 🎂",
                category: 'personal'
            },
            {
                id: 6,
                name: "Order Confirmation",
                content: "Your order has been confirmed! We'll keep you updated on the delivery status.",
                category: 'support'
            }
        ];
        setTemplates(defaultTemplates);
    }, []);

    const validatePhone = (phoneNumber: string) => {
        const phoneRegex = /^[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
    };

    const formatPhone = (phoneNumber: string) => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `91${cleaned}`; // Add India country code if not present
        }
        return cleaned;
    };

    const handleSend = () => {
        if (phone.trim() === "" || message.trim() === "") return;

        const formattedPhone = formatPhone(phone);

        if (!validatePhone(formattedPhone)) {
            alert("Please enter a valid phone number");
            return;
        }

        if (useSchedule && scheduledTime) {
            const scheduledDate = new Date(scheduledTime);
            const now = new Date();

            if (scheduledDate <= now) {
                alert("Please select a future time for scheduling");
                return;
            }

            // In a real app, you'd save this to a backend for later sending
            alert(`Message scheduled for ${scheduledDate.toLocaleString()}`);
            return;
        }

        if (bulkMode && bulkNumbers) {
            const numbers = bulkNumbers.split('\n').filter(n => n.trim());
            numbers.forEach((num, index) => {
                setTimeout(() => {
                    const url = `https://wa.me/${formatPhone(num.trim())}?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                }, index * 1000); // 1 second delay between each message
            });
        } else {
            const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        }

        // Add to history
        const historyEntry = {
            phone: formattedPhone,
            message: message,
            timestamp: new Date()
        };
        setMessageHistory(prev => [historyEntry, ...prev.slice(0, 19)]); // Keep last 20

        // Update contact usage
        if (selectedContact) {
            setContacts(prev =>
                prev.map(contact =>
                    contact.id === selectedContact.id
                        ? { ...contact, lastUsed: new Date(), messageCount: contact.messageCount + 1 }
                        : contact
                )
            );
        }

        // Reset form
        if (!bulkMode) {
            setPhone("");
        }
        setMessage("");
        setSelectedContact(null);
        setSelectedTemplate(null);
    };

    const addContact = () => {
        if (!newContactName.trim() || !phone.trim()) return;

        const formattedPhone = formatPhone(phone);
        if (!validatePhone(formattedPhone)) {
            alert("Please enter a valid phone number");
            return;
        }

        const newContact: Contact = {
            id: Date.now(),
            name: newContactName.trim(),
            phone: formattedPhone,
            lastUsed: new Date(),
            messageCount: 0
        };

        setContacts(prev => [...prev, newContact]);
        setNewContactName("");
        setShowAddContact(false);
    };

    const selectContact = (contact: Contact) => {
        setSelectedContact(contact);
        setPhone(contact.phone);
        setShowContacts(false);
    };

    const selectTemplate = (template: MessageTemplate) => {
        setSelectedTemplate(template);
        setMessage(template.content);
        setShowTemplates(false);
    };

    const removeContact = (contactId: number) => {
        setContacts(prev => prev.filter(c => c.id !== contactId));
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'business': return '💼';
            case 'personal': return '👤';
            case 'marketing': return '📢';
            case 'support': return '🎧';
            default: return '💬';
        }
    };

    const getCharacterCount = () => {
        const count = message.length;
        const color = count > 1000 ? 'text-red-500' : count > 800 ? 'text-yellow-500' : 'text-gray-500';
        return { count, color };
    };

    const { count: charCount, color: charColor } = getCharacterCount();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl">📱</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">WhatsApp Message Sender</h1>
                    <p className="text-gray-600">Send messages instantly or schedule them for later</p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setBulkMode(false)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${!bulkMode
                                    ? 'bg-white shadow-sm text-green-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Single Message
                        </button>
                        <button
                            onClick={() => setBulkMode(true)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${bulkMode
                                    ? 'bg-white shadow-sm text-green-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Bulk Messages
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Quick Actions */}
                        <div className="grid grid-cols-3 gap-4 w-full">
                            <button
                                onClick={() => setShowContacts(!showContacts)}
                                className="flex items-center justify-center space-x-2 py-4 px-6 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors w-full text-lg"
                            >
                                <span className="text-xl">👥</span>
                                <span className="font-medium">Contacts</span>
                            </button>

                            <button
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="flex items-center justify-center space-x-2 py-4 px-6 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors w-full text-lg"
                            >
                                <span className="text-xl">📝</span>
                                <span className="font-medium">Templates</span>
                            </button>

                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="flex items-center justify-center space-x-2 py-4 px-6 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors w-full text-lg"
                            >
                                <span className="text-xl">📜</span>
                                <span className="font-medium">History</span>
                            </button>

                            {/* <button
                onClick={() => setShowAddContact(!showAddContact)}
                className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
              >
                <span>➕</span>
                <span className="text-sm font-medium">Add Contact</span>
              </button> */}
                        </div>

                        {/* Phone Input */}
                        {!bulkMode ? (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number {selectedContact && (
                                        <span className="text-green-600 ml-2">({selectedContact.name})</span>
                                    )}
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            setSelectedContact(null);
                                        }}
                                        placeholder="Enter phone number (e.g., 919876543210)"
                                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
                                    />
                                    {phone && validatePhone(formatPhone(phone)) && (
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">✓</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">Include country code (e.g., 91 for India)</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Numbers (one per line)
                                </label>
                                <textarea
                                    value={bulkNumbers}
                                    onChange={(e) => setBulkNumbers(e.target.value)}
                                    placeholder="919876543210&#10;918765432109&#10;917654321098"
                                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
                                    rows={4}
                                />
                                <p className="text-xs text-gray-500">
                                    {bulkNumbers.split('\n').filter(n => n.trim()).length} numbers entered
                                </p>
                            </div>
                        )}

                        {/* Message Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">
                                    Message {selectedTemplate && (
                                        <span className="text-purple-600 ml-2">({selectedTemplate.name})</span>
                                    )}
                                </label>
                                <span className={`text-sm ${charColor}`}>
                                    {charCount}/1600
                                </span>
                            </div>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all resize-none"
                                rows={6}
                                maxLength={1600}
                            />
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>💡 Tip: Use emojis to make your message more engaging</span>
                            </div>
                        </div>

                        {/* Schedule Options */}
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center space-x-3 mb-3">
                                <input
                                    type="checkbox"
                                    id="schedule"
                                    checked={useSchedule}
                                    onChange={(e) => setUseSchedule(e.target.checked)}
                                    className="w-4 h-4 text-green-600 focus:ring-green-300 rounded"
                                />
                                <label htmlFor="schedule" className="text-sm font-medium text-gray-700">
                                    📅 Schedule for later
                                </label>
                            </div>

                            {useSchedule && (
                                <input
                                    type="datetime-local"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                />
                            )}
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSend}
                            disabled={(!phone.trim() && !bulkNumbers.trim()) || !message.trim()}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {useSchedule ? '📅 Schedule Message' : bulkMode ? '📤 Send Bulk Messages' : '📱 Send via WhatsApp'}
                        </button>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Add Contact Form */}
                        {showAddContact && (
                            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                <h3 className="font-semibold text-green-800 mb-3">Add New Contact</h3>
                                <input
                                    type="text"
                                    value={newContactName}
                                    onChange={(e) => setNewContactName(e.target.value)}
                                    placeholder="Contact name"
                                    className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={addContact}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowAddContact(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Contacts */}
                        {showContacts && (
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 max-h-80 overflow-y-auto">
                                <h3 className="font-semibold text-blue-800 mb-3">
                                    Saved Contacts ({contacts.length})
                                </h3>
                                {contacts.length === 0 ? (
                                    <p className="text-blue-600 text-sm">No contacts saved yet.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {contacts.map(contact => (
                                            <div
                                                key={contact.id}
                                                className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                <button
                                                    onClick={() => selectContact(contact)}
                                                    className="flex-1 text-left"
                                                >
                                                    <div className="font-medium text-gray-800">{contact.name}</div>
                                                    <div className="text-sm text-gray-500">{contact.phone}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {contact.messageCount} messages • Last used: {contact.lastUsed.toLocaleDateString()}
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => removeContact(contact.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Templates */}
                        {showTemplates && (
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 max-h-80 overflow-y-auto">
                                <h3 className="font-semibold text-purple-800 mb-3">Message Templates</h3>
                                <div className="space-y-2">
                                    {templates.map(template => (
                                        <button
                                            key={template.id}
                                            onClick={() => selectTemplate(template)}
                                            className="w-full text-left p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors border border-purple-100"
                                        >
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span>{getCategoryIcon(template.category)}</span>
                                                <span className="font-medium text-gray-800">{template.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message History */}
                        {showHistory && (
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 max-h-80 overflow-y-auto">
                                <h3 className="font-semibold text-orange-800 mb-3">
                                    Recent Messages ({messageHistory.length})
                                </h3>
                                {messageHistory.length === 0 ? (
                                    <p className="text-orange-600 text-sm">No messages sent yet.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {messageHistory.slice(0, 10).map((entry, index) => (
                                            <div key={index} className="p-3 bg-white rounded-lg border border-orange-100">
                                                <div className="text-sm font-medium text-gray-800">+{entry.phone}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2 mt-1">{entry.message}</div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {entry.timestamp.toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tips */}
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                            <h3 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h3>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Include country code for international numbers</li>
                                <li>• Use templates to save time</li>
                                <li>• Keep messages under 1600 characters</li>
                                <li>• Add emojis to make messages engaging</li>
                                <li>• Save frequent contacts for quick access</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendWhatsApp;