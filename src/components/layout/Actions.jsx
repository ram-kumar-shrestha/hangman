import React from 'react'
import {
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineDeploymentUnit,
} from 'react-icons/ai'
import {MdOutlinePostAdd, MdAddBusiness} from 'react-icons/md'

import ActionLink from './ActionLink'

const Actions = ({relativePath = ''}) => {
  return (
    <aside className="actions d-flex flex-column">
      <ActionLink
        href={`${relativePath}/inventory/add-item`}
        name="Add Item"
        icon={<MdOutlinePostAdd />}
      />
      <ActionLink
        href={`${relativePath}/units/add-unit`}
        name="Add Unit"
        icon={<AiOutlineDeploymentUnit />}
      />
      <ActionLink
        href={`${relativePath}/owners/add-owner`}
        name="Add Owner"
        icon={<AiOutlineUserAdd />}
      />
      <ActionLink
        href={`${relativePath}/outlets/add-outlet`}
        name="Add Outlet"
        icon={<MdAddBusiness />}
      />
      <ActionLink
        href={`${relativePath}/users/register-user`}
        name="Add User"
        icon={<AiOutlineUsergroupAdd />}
      />
    </aside>
  )
}

export default Actions
