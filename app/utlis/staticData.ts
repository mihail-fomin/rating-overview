export const departments = [
  { label: 'Клиентский', value: 'CLIENT' },
  { label: 'Продажи', value: 'SALES' },
  { label: 'Разработка', value: 'DEVELOPMENT' },
]

export const positions = [
  { label: 'Сотрудник', value: 'WORKER' },
  { label: 'Руководитель', value: 'LEADER' },
]

interface Item {
  value: string
  label: string
}

const getLabel = (value: string, items: Item[]): string => {
  const label = items.find((item) => item.value === value)?.label
  return label ? label : 'Unknown'
}

export const getDepartmentLabel = (department: string) => getLabel(department, departments)

export const getPositionsLabel = (position: string) => getLabel(position, positions)
