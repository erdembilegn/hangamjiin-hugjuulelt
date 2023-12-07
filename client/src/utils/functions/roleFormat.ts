//Hereglegchiin erhiig zaaj ugsun code
enum Role {
  student = 'Суралцагч',
  admin = 'Админ',
}

export const roleName = (role: string): string => {
  switch (role) {
    case 'Admin' || 'admin':
      return Role.admin;
    default:
      return Role.student;
  }
};
