import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Brak adresu e-mail." }, { status: 400 });
    }

    const res = await fetch("https://api.getresponse.com/v3/contacts", {
      method: "POST",
      headers: {
        "X-Auth-Token": `api-key ${process.env.GETRESPONSE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        name: name?.trim() || "",
        campaign: { campaignId: process.env.GETRESPONSE_LIST_ID },
      }),
    });

    // 409 = kontakt już istnieje na liście — traktujemy jako sukces
    if (res.ok || res.status === 409) {
      return NextResponse.json({ success: true });
    }

    const errorBody = await res.text();
    console.error("GetResponse error:", res.status, errorBody);
    return NextResponse.json({ error: "Błąd zapisu do listy." }, { status: 500 });

  } catch (err) {
    console.error("Newsletter route error:", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
