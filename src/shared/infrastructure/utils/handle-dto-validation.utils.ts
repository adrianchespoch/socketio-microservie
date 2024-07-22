export const handleDtoValidation = (issues: any[]): string[] => {
  return issues.map(issue => {
    return `${
      // issue.path.join('.').slice(0, 1).toUpperCase() +
      // issue.path.join('.').slice(1)
      issue.path
    }: ${issue.message}`;
  });
};
