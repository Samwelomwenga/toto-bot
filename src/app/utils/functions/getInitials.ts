function getInitials(fullName: string): string {
    const names = fullName.split(' ');
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }
  export default getInitials;