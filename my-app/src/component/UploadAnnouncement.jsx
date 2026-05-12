import { useState } from "react";

export default function UploadAnnouncement() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        author: user?.name,
        role: user?.role
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Announcement Posted ✅");
      setForm({ title: "", description: "" });
    } else {
      alert(data.message);
    }
  };

  // 🔐 Restrict access
  if (user?.role !== "Admin" && user?.role !== "Faculty") {
    return <h2 className="p-6">Access Denied ❌</h2>;
  }

  return (
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          Create Announcement
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Post Announcement
        </button>
      </form>
    </div>
  );
}