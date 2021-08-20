export const tagService = (postMessage) => {
    const tagSet = new Set();
    for(let i = 0; i < postMessage.length; i++) {
        for(let j = 0; j < postMessage[i].tags.length; j++) {
            tagSet.add(postMessage[i].tags[j]);
        }
    }
    return Array.from(tagSet);
}
