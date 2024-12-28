'use server'

export async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email);

  }