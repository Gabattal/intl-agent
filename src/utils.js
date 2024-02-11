function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeString(string) {
    return string.replace(/[\s,.]+/g, " ").trim();
}

module.exports = { escapeRegExp, normalizeString };