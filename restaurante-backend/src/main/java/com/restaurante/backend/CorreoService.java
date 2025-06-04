package com.restaurante.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CorreoService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envía un correo con las credenciales al usuario.
     *
     * @param toEmail    Correo del destinatario
     * @param usuario    Nombre de usuario del sistema
     * @param contrasena Contraseña del usuario
     */
    public void enviarCredenciales(String toEmail, String usuario, String contrasena) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(toEmail);
        mensaje.setSubject("Recuperación de credenciales - Restaurante Chedy's");
        mensaje.setText(
                "Hola,\n\nAquí están tus credenciales de acceso:\n\n" +
                "Usuario: " + usuario + "\n" +
                "Contraseña: " + contrasena + "\n\n" +
                "Gracias por usar nuestro sistema.\n\n" +
                "Equipo de Restaurante Chedy's");
        mailSender.send(mensaje);
    }
}
