


  const Role = {
    student: "student",
    admin: "admin"
  } as const;

export  type TRole = keyof typeof Role;