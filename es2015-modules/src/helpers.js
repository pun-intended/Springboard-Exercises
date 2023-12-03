function choice(items) {
    const idx = Math.floor(Math.random() * items.length)
    return items[idx]
}

function remove(items, item){
    const itemIdx = items.indexOf(item)
    if(itemIdx > -1){
        const newItem = item
        items.splice(itemIdx, 1)
        return newItem
    }
    return
}

export { choice, remove }