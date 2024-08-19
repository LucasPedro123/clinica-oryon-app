export function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    
   
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    
    const day = date.getDate();
    const month = months[date.getMonth()]; 
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  