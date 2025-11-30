export async function getItems(url) {
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      if (res.status === 404) throw new Error("404 - Item not found");
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (e) {
    throw e;
  }
}

export async function addItem(url, item) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.status !== 201) {
      throw new Error(`Fail to add item: ${res.status} - ${res.statusText}`);
    }
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function editItem(url, item) {
  try {
    const res = await fetch(`${url}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.status !== 200) {
      throw new Error(`Fail to edit item: ${res.status} - ${res.statusText}`);
    }
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function deleteItem(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw new Error(`Fail to delete item: ${res.status} - ${res.statusText}`);
    try {
      return await res.json();
    } catch (e) {
      return id;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}