export type Item = {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  path: string
  parentId: string | null
}

export const items: Item[] = [
  {
    id: "root",
    name: "My Drive",
    type: "folder",
    modified: "2024-02-02",
    path: "/",
    parentId: null,
  },
  {
    id: "docs",
    name: "Documents",
    type: "folder",
    modified: "2024-02-01",
    path: "/documents",
    parentId: "root",
  },
  {
    id: "images",
    name: "Images",
    type: "folder",
    modified: "2024-02-01",
    path: "/images",
    parentId: "root",
  },
  {
    id: "work",
    name: "Work",
    type: "folder",
    modified: "2024-02-01",
    path: "/documents/work",
    parentId: "docs",
  },
  {
    id: "personal",
    name: "Personal",
    type: "folder",
    modified: "2024-02-01",
    path: "/documents/personal",
    parentId: "docs",
  },
  {
    id: "resume",
    name: "resume.pdf",
    type: "file",
    size: "2.5 MB",
    modified: "2024-02-01",
    path: "/documents/resume.pdf",
    parentId: "docs",
  },
  {
    id: "proposal",
    name: "proposal.docx",
    type: "file",
    size: "1.2 MB",
    modified: "2024-02-01",
    path: "/documents/work/proposal.docx",
    parentId: "work",
  },
  {
    id: "vacation",
    name: "vacation.jpg",
    type: "file",
    size: "3.7 MB",
    modified: "2024-02-01",
    path: "/images/vacation.jpg",
    parentId: "images",
  },
]

export function getItemsByParentId(parentId: string | null) {
  return items.filter((item) => item.parentId === parentId)
}

export function getItemById(id: string) {
  return items.find((item) => item.id === id)
}

export function getBreadcrumbItems(id: string | null): Item[] {
  const breadcrumbs: Item[] = []
  let currentItem = id ? getItemById(id) : null

  while (currentItem) {
    breadcrumbs.unshift(currentItem)
    currentItem = currentItem.parentId ? getItemById(currentItem.parentId) : null
  }

  return breadcrumbs
}

