
export type Student = {
  id: number;
  name: string;
  subject: string;
  award: string;
  school_year: string;
};

export async function getStudents(): Promise<Student[]> {
  const response = await fetch("/api/students");

  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.status}`);
  }

  return (await response.json()) as Student[];
}
