function htmlConverter(formData) {
    return `
    <table>
        <tbody>
         <tr>
            <td>First name</td>
            <td>${formData.firstname}</td>
        </tr>
        <tr>
            <td>Last name</td>
            <td>${formData.lastname}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${formData.email}</td>
        </tr>
        <tr>
            <td>Message</td>
            <td>${formData.message}</td>
        </tr>
        </tbody>
    </table> `;
}

export default htmlConverter;
