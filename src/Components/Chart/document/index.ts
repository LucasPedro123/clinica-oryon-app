import { Food } from "../../../Interfaces/app.interfaces";

function documentTable(foodsData: Food[], totalCalories: number, username: string, birthDateISO: string, photo?: string) {
    let foods = foodsData;

    const age = calculateAge(birthDateISO);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    const formattedStartOfWeek = formatDate(startOfWeek);
    const formattedEndOfWeek = formatDate(endOfWeek);

    const generateTableRows = (foods: Food[]): string => {
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const caloriesByDay: Record<number, { foods: Food[], totalCalories: number }> = {
            0: { foods: [], totalCalories: 0 },
            1: { foods: [], totalCalories: 0 },
            2: { foods: [], totalCalories: 0 },
            3: { foods: [], totalCalories: 0 },
            4: { foods: [], totalCalories: 0 },
            5: { foods: [], totalCalories: 0 },
            6: { foods: [], totalCalories: 0 },
        };

        foods.forEach(food => {
            const foodDate = new Date(food.date);
            const dayOfWeek = foodDate.getDay();

            caloriesByDay[dayOfWeek].foods.push(food);
            caloriesByDay[dayOfWeek].totalCalories += food.calories;
        });

        return daysOfWeek.map((day, index) => {
            const foodsConsumed = caloriesByDay[index].foods
                .map(food => `- ${food.name}: ${food.calories} Kcal (${food.portion})`)
                .join('<br />');

            return `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${day}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${foodsConsumed || '  '}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${caloriesByDay[index].totalCalories} Kcal</td>
                </tr>
            `;
        }).join('');
    };

    const html = `
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="display: flex; flex-direction: column; justify-content: center;">
        <img 
            width="200"
            src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/41f0b822-c276-4740-9416-a765a6a8740e"
            style="margin: 15px auto;"
        />

        <h4 style="padding-left: 20px;">${formattedStartOfWeek} a ${formattedEndOfWeek}</h4>
        <div style="display: flex; gap: 20px; padding-left: 20px;">
            <img style="border-radius: 20px; width: 100px; height: 100px; object-fit: cover;"
                src=${photo == null ? "https://static.vecteezy.com/ti/vetor-gratis/p1/9292244-default-avatar-icon-vector-of-social-media-user-vetor.jpg" : `${photo}`}
                alt="Avatar padrão">
            <div>
                <p><b>${username}</b></p>
                <b>${age} Anos</b>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Dia da Semana</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Alimentos Consumidos</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total de Calorias</th>
                </tr>
            </thead>
            <tbody>
                ${generateTableRows(foods)}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Total de Calorias da Semana</td>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${totalCalories} Kcal</td>
                </tr>
            </tfoot>
        </table>
    </body>
    </html>
    `;

    return html;
}

function calculateAge(birthDateISO: string): number {
    const birthDate = new Date(birthDateISO);

    if (isNaN(birthDate.getTime())) {
        console.error("Data inválida:", birthDateISO);
        return NaN;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default documentTable;
