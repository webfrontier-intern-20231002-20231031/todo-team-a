type TagSelectorProps = {
    tagName: string
}

const TagSelector = ({tagName}: TagSelectorProps) => {
    return <label className="inline-block"><input type="checkbox" value={tagName} className="checkbox checkbox-xs" /> {tagName}　</label>
}
export default TagSelector;