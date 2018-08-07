module.exports = {
    project: 'md2pdf',
    version: '1.0.0',
    // 排序會牽涉 PDF 內容的順序
    sequence:
        [
            "subject.md",
            "chapter.md",
            "changelog.md",
            "content.md",
        ],
}