import { useState, useEffect } from 'react';

export const useRoleBasedAccess = () => {
  const [role, setRole] = useState('viewer');
  const [permissions, setPermissions] = useState({
    canView: true,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canExport: false
  });

  useEffect(() => {
    const rolePermissions = {
      viewer: {
        canView: true,
        canAdd: false,
        canEdit: false,
        canDelete: false,
        canExport: true
      },
      admin: {
        canView: true,
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canExport: true
      },
      editor: {
        canView: true,
        canAdd: true,
        canEdit: true,
        canDelete: false,
        canExport: true
      }
    };

    setPermissions(rolePermissions[role] || rolePermissions.viewer);
  }, [role]);

  const changeRole = (newRole) => {
    setRole(newRole);
  };

  const hasPermission = (permission) => {
    return permissions[permission] || false;
  };

  return {
    role,
    permissions,
    changeRole,
    hasPermission
  };
};
