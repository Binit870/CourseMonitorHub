// client/src/components/EditProfileModal.jsx
import React, { useState } from "react";

const EditProfileModal = ({ open, onClose, initial, onSave }) => {
  const [name, setName] = useState(initial?.name || "");
  const [bio, setBio] = useState(initial?.bio || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3 dark:bg-slate-700 dark:border-slate-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <label className="text-sm font-medium">Bio</label>
        <textarea
          rows={4}
          className="w-full p-2 border rounded mb-3 dark:bg-slate-700 dark:border-slate-600"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A short bio"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, bio })}
            className="px-4 py-2 rounded bg-cyan-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
