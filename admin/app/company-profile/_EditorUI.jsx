"use client";

export default function EditorUI({ form, setForm, save }) {

  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">

      <h1 className="text-2xl font-bold">
        Company Profile Editor
      </h1>

      {/*  Certificates  */}
      <Card title="Registration & Certificates">

        <Field label="Certificate of Incorporation">
          <input className="input"
            value={form.incorporation_no || ""}
            onChange={e=>set("incorporation_no", e.target.value)}
          />
        </Field>

        <Field label="Business Commencement Date">
          <input className="input"
            value={form.business_start || ""}
            onChange={e=>set("business_start", e.target.value)}
          />
        </Field>

        <Field label="IDRA Registration No">
          <input className="input"
            value={form.idra_no || ""}
            onChange={e=>set("idra_no", e.target.value)}
          />
        </Field>

      </Card>

      {/*  Capital  */}
      <Card title="Capital Info">

        <Field label="Authorized Capital">
          <input className="input"
            value={form.authorized_capital || ""}
            onChange={e=>set("authorized_capital", e.target.value)}
          />
        </Field>

        <Field label="Paid Up Capital">
          <input className="input"
            value={form.paidup_capital || ""}
            onChange={e=>set("paidup_capital", e.target.value)}
          />
        </Field>

      </Card>

      {/*  Head Office  */}
      <Card title="Head Office Address">

        <textarea rows={5}
          className="input"
          placeholder="One line per row"
          value={form.head_office || ""}
          onChange={e=>set("head_office", e.target.value)}
        />

      </Card>

      {/*  Organization  */}
      <Card title="Organization">

        <Field label="Re-Insurer">
          <input className="input"
            value={form.reinsurer || ""}
            onChange={e=>set("reinsurer", e.target.value)}
          />
        </Field>

        <Field label="Auditors">
          <input className="input"
            value={form.auditors || ""}
            onChange={e=>set("auditors", e.target.value)}
          />
        </Field>

        <Field label="Actuary">
          <input className="input"
            value={form.actuary || ""}
            onChange={e=>set("actuary", e.target.value)}
          />
        </Field>

        <Field label="Bankers (comma separated)">
          <input className="input"
            value={form.bankers || ""}
            onChange={e=>set("bankers", e.target.value)}
          />
        </Field>

        <Field label="Membership">
          <input className="input"
            value={form.membership || ""}
            onChange={e=>set("membership", e.target.value)}
          />
        </Field>

      </Card>

      {/*  Contact  */}
      <Card title="Contact Info">

        <Field label="Telephone">
          <input className="input"
            value={form.telephone || ""}
            onChange={e=>set("telephone", e.target.value)}
          />
        </Field>

        <Field label="Fax">
          <input className="input"
            value={form.fax || ""}
            onChange={e=>set("fax", e.target.value)}
          />
        </Field>

        <Field label="Email">
          <input className="input"
            value={form.email || ""}
            onChange={e=>set("email", e.target.value)}
          />
        </Field>

        <Field label="Website">
          <input className="input"
            value={form.website || ""}
            onChange={e=>set("website", e.target.value)}
          />
        </Field>

      </Card>

      {/* SAVE */}
      <button
        onClick={save}
        className="bg-purple-700 text-white px-8 py-3 rounded-lg"
      >
        Save Company Profile
      </button>

    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="border rounded-xl p-6 space-y-4 bg-white shadow-sm">
      <div className="font-semibold text-lg">{title}</div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-sm font-medium mb-1">{label}</div>
      {children}
    </div>
  );
}
