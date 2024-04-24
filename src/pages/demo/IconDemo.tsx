import FaIcon from '../../components/icons/FaIcon'
import { IconDefinitions } from '../../components/icons/icon.definitions'

function IconDemo() {
  const data = [
    {
      id: 1,
      icon: IconDefinitions.account_circle,
      name: 'account_circle',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 2,
      icon: IconDefinitions.add,
      name: 'add',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 3,
      icon: IconDefinitions.calendar_today,
      name: 'calendar_today',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 4,
      icon: IconDefinitions.close,
      name: 'close',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 5,
      icon: IconDefinitions.copy,
      name: 'copy',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 6,
      icon: IconDefinitions.faAngleDoubleLeft,
      name: 'faAngleDoubleLeft',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 7,
      icon: IconDefinitions.faAngleDoubleRight,
      name: 'faAngleDoubleRight',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 8,
      icon: IconDefinitions.faCalendarAlt,
      name: 'faCalendarAlt',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 9,
      icon: IconDefinitions.faExclamationTriangle,
      name: 'faExclamationTriangle',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 10,
      icon: IconDefinitions.faPencil,
      name: 'faPencil',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 11,
      icon: IconDefinitions.faPlus,
      name: 'faPlus',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 12,
      icon: IconDefinitions.faSearch,
      name: 'faSearch',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 13,
      icon: IconDefinitions.faTrash,
      name: 'faTrash',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
    {
      id: 14,
      icon: IconDefinitions.faXmark,
      name: 'faXmark',
      _xs: 'xs',
      _2xs: '2xs',
      _sm: 'sm',
      _lg: 'lg',
      _xl: 'xl',
      _2xl: '2xl',
    },
  ]

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="pl-2">Icon</th>
            <th className="pl-2">Icon Name</th>
            <th className="pl-2">xs</th>
            <th className="pl-2">2xs</th>
            <th className="pl-2">sm</th>
            <th className="pl-2">lg</th>
            <th className="pl-2">xl</th>
            <th className="pl-2">2xl</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <FaIcon iconSrc={item.icon}></FaIcon>
              </td>
              <td>{item.name}</td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._xs}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._xs} {'></FaIcon>'}
              </td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._2xs}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._2xs} {'></FaIcon>'}
              </td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._sm}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._sm} {'></FaIcon>'}
              </td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._lg}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._lg} {'></FaIcon>'}
              </td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._xl}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._xl} {'></FaIcon>'}
              </td>
              <td>
                <FaIcon iconSrc={item.icon} size={item._2xl}></FaIcon>
                <br />
                {'<FaIcon iconSrc=IconDefinitions.'}
                {item.name} {' size='} {item._2xl} {'></FaIcon>'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IconDemo
