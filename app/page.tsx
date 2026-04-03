"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No output received.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className={"text-3xl font-bold mb-2 text-pink-400"}>AI Makeup Tutorial Generator</h1>
        <p className="text-gray-400 mb-8">Generate step-by-step makeup looks and tutorial guides</p>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-3">
          <select value={form.occasion || ""} onChange={e => setForm(f => ({...f, occasion: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Occasion</option><option value="everyday">Everyday / No Makeup Makeup</option><option value="work">Work / Office Look</option><option value="date">Date Night</option><option value="party">Party / Night Out</option><option value="wedding">Wedding / Formal</option><option value="special">Special Event / Gala</option><option value="photoshoot">Photoshoot / Photography</option></select>
          <select value={form.skinType || ""} onChange={e => setForm(f => ({...f, skinType: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Skin Type</option><option value="dry">Dry</option><option value="oily">Oily</option><option value="combination">Combination</option><option value="normal">Normal</option><option value="sensitive">Sensitive</option></select>
          <select value={form.skinTone || ""} onChange={e => setForm(f => ({...f, skinTone: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Skin Tone</option><option value="fair">Fair (Porcelain, Light)</option><option value="light">Light (Beige, Light Tan)</option><option value="medium">Medium (Tan, Olive)</option><option value="tan">Tan (Caramel, Golden)</option><option value="dark">Dark (Espresso, Deep)</option></select>
          <select value={form.eyeColor || ""} onChange={e => setForm(f => ({...f, eyeColor: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Eye Color</option><option value="brown">Brown</option><option value="blue">Blue</option><option value="green">Green</option><option value="hazel">Hazel</option><option value="gray">Gray</option><option value="dark">Dark / Black</option></select>
          <select value={form.faceShape || ""} onChange={e => setForm(f => ({...f, faceShape: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Face Shape</option><option value="oval">Oval</option><option value="round">Round</option><option value="square">Square</option><option value="heart">Heart</option><option value="oblong">Oblong / Long</option><option value="diamond">Diamond</option></select>
          <select value={form.skillLevel || ""} onChange={e => setForm(f => ({...f, skillLevel: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Skill Level</option><option value="beginner">Beginner (under 1 year)</option><option value="intermediate">Intermediate (1-3 years)</option><option value="advanced">Advanced (3+ years)</option></select>
          <input type="text" placeholder="e.g. 15 min, 30 min, 1 hour" value={form.timeAvailable || ""} onChange={e => setForm(f => ({...f, timeAvailable: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500" />
          <select value={form.budgetTier || ""} onChange={e => setForm(f => ({...f, budgetTier: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Budget Tier</option><option value="drugstore">Drugstore Only ($)</option><option value="midrange">Mid-Range ($$)</option><option value="luxury">Luxury ($$$)</option><option value="mix">Mix of all tiers</option></select>
          <select value={form.season || ""} onChange={e => setForm(f => ({...f, season: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Seasonal Preference</option><option value="spring">Spring / Summer (Lighter)</option><option value="fall">Fall / Winter (Deeper)</option><option value="year-round">Year-Round</option></select>
          <textarea placeholder="e.g. acne scars, redness, dark circles, large pores" value={form.skinConcerns || ""} onChange={e => setForm(f => ({...f, skinConcerns: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          </div>
          <button type="submit" disabled={loading}
            className={"w-full py-3 px-6 rounded-lg font-semibold bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white transition"}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        {error && <div className="p-4 rounded-lg bg-red-900/50 text-red-300">{error}</div>}
        {output && <div className="p-6 rounded-lg bg-gray-800 whitespace-pre-wrap text-gray-200 font-mono text-sm border border-gray-700">{output}</div>}
      </div>
    </div>
  );
}
