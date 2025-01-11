create table usuarios(
id_usuario INT auto_increment PRIMARY KEY,
nombre_usuario varchar(255) not null,
email varchar(255) unique not null,
password_hash varchar(255),
id_empresa int 
);

create table historias_usuario(
id_historia int auto_increment primary key,
titulo varchar(255) not null,
descripcion text,
creado_por int not null,
id_proyecto int
);

create table proyectos(
id_proyecto int auto_increment primary key,
nombre_proyecto varchar(255) not null,
descripcion text,
id_empresa int
);

create table empresas(
id_empresa int auto_increment primary key,
nombre_empresa varchar(255) not null,
nit varchar(20) unique not null,
telefono varchar(20),
direccion text,
correo varchar(255)
);

create table tickets(
id_ticket int auto_increment primary key,
titulo varchar(255) not null,
descripcion text,
estado int not null default 1,
comentario text,
creado_por INT NOT NULL,
id_historia int
);

alter table usuarios
add constraint fk_empresa_usuario foreign key(id_empresa)
references empresas(id_empresa);

alter table historias_usuario
add constraint fk_proyecto_hitoria foreign key(id_proyecto)
references proyectos(id_proyecto);

alter table proyectos
add constraint fk_empresa_proyecto foreign key(id_empresa)
references empresas(id_empresa);

alter table tickets
add constraint fk_hitoria_ticket foreign key(id_historia)
references historias_usuario(id_historia);

ALTER TABLE tickets
ADD CONSTRAINT fk_ticket_creador FOREIGN KEY (creado_por) 
REFERENCES usuarios(id_usuario);


ALTER TABLE historias_usuario
ADD CONSTRAINT fk_creador_historia FOREIGN KEY (creado_por) 
REFERENCES usuarios(id_usuario);

-- Poblar pase de datos segun requerimiento de la prueba

INSERT INTO empresas (nombre_empresa, nit, telefono, direccion, correo)
VALUES
('Tecnología Innovadora S.A.S.', '900123456-7', '3216549870', 'Calle 10 #12-34, Bogotá, Colombia', 'contacto@tecinnovadora.com'),
('Soluciones IT Ltda.', '8007654321-5', '3129876543', 'Av. 7 #15-56, Medellín, Colombia', 'soporte@solucionesit.com'),
('Comercio Global S.A.', '700112233-1', '3012345678', 'Carrera 50 #8-22, Cali, Colombia', 'info@comercioglobal.com');


-- usuario default clave "clave" hasheada
INSERT INTO usuarios (nombre_usuario, email, password_hash, id_empresa)
VALUES ('Juan Pérez', 'juan.perez@correo.com', '7b4eaa624d145aba1d30fa64f1c52a1694511bcb3f03fe4b256aba125e06e380', 1);

INSERT INTO proyectos (nombre_proyecto, descripcion, id_empresa)
VALUES ('E-commerce Platform', 'Plataforma de comercio electrónico para venta de productos', 1);

INSERT INTO proyectos (nombre_proyecto, descripcion, id_empresa)
VALUES 
('Gestión de Inventarios', 'Sistema para gestionar el inventario de productos en la tienda.', 2),
('Aplicación Móvil', 'Desarrollo de una app móvil para realizar compras en línea.', 2);


-- Historias de Usuario para el Proyecto E-commerce Platform
INSERT INTO historias_usuario (titulo, descripcion, creado_por, id_proyecto)
VALUES 
('Poder agregar productos al carrito de compras', 'Como usuario, quiero agregar productos a mi carrito de compras para poder comprarlos más tarde.', 1, 1),
('Poder realizar el pago de la compra', 'Como usuario, quiero poder pagar los productos en mi carrito para finalizar la compra.', 1, 1),
('Ver historial de compras', 'Como usuario, quiero ver un historial de mis compras anteriores para revisar mis compras pasadas.', 1, 1);



INSERT INTO historias_usuario (titulo, descripcion, creado_por, id_proyecto)
VALUES 
('Poder agregar productos al inventario', 'Como administrador, quiero agregar productos al inventario para tener un registro de los mismos en el sistema.', 1, 2),
('Poder actualizar stock de productos', 'Como administrador, quiero actualizar el stock de productos para mantener la cantidad de productos disponible en tiempo real.', 1, 2),
('Poder eliminar productos del inventario', 'Como administrador, quiero eliminar productos del inventario cuando ya no estén disponibles o sean descontinuados.', 1, 2);

-- Historias de Usuario para el Proyecto Aplicación Móvil
INSERT INTO historias_usuario (titulo, descripcion, creado_por, id_proyecto)
VALUES 
('Poder registrarse en la aplicación', 'Como usuario, quiero registrarme en la aplicación móvil para crear una cuenta y acceder a las funcionalidades.', 1, 3),
('Poder agregar productos al carrito en la app', 'Como usuario, quiero agregar productos al carrito desde la aplicación móvil para comprarlos más tarde.', 1, 3),
('Poder ver el estado de los pedidos', 'Como usuario, quiero ver el estado de mis pedidos en la aplicación para saber si están siendo procesados o enviados.', 1, 3);


-- primeros tickets
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Diseñar interfaz de carrito', 'Crear el diseño de la interfaz para el carrito de compras en la página web.', 1, 'El diseño del carrito está pendiente y se iniciará esta semana.', 1, 1);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Implementar sistema de pago', 'Desarrollar e integrar el sistema de pagos en línea con las principales pasarelas de pago.', 1, 'Integración pendiente para la primera versión.', 1, 2);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar página de historial de compras', 'Crear la interfaz para mostrar el historial de compras del usuario.', 1, 'La implementación del historial de compras está en espera.', 1, 3);


INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Crear formulario de adición de producto', 'Desarrollar un formulario para agregar nuevos productos al inventario.', 1, 'El formulario está pendiente de implementación.', 1, 4);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar funcionalidad de actualización de stock', 'Desarrollar la funcionalidad que permita actualizar el stock de productos de manera eficiente.', 1, 'Funcionalidad pendiente de desarrollo.', 1, 5);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Implementar eliminación de productos', 'Desarrollar la opción para eliminar productos del inventario.', 1, 'La implementación de la funcionalidad está pendiente.', 1, 6);

-- proyecto 3
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Diseñar formulario de registro', 'Crear la interfaz para el formulario de registro de usuarios en la aplicación móvil.', 1, 'El diseño está pendiente de revisión y aprobación.', 1, 7);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Implementar login de usuario', 'Desarrollar la funcionalidad para que los usuarios puedan iniciar sesión en la aplicación móvil.', 1, 'La funcionalidad de login se encuentra en desarrollo.', 1, 8);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar vista de perfil de usuario', 'Crear la vista del perfil de usuario dentro de la aplicación móvil.', 1, 'El diseño de la vista de perfil está en proceso.', 1, 9);

-- tickets en proceso
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar la funcionalidad de agregar al carrito', 'Desarrollar la funcionalidad para agregar productos al carrito de compras desde la vista de productos.', 2, 'La funcionalidad está en desarrollo y el equipo de backend está trabajando en la integración.', 1, 1);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Integrar pasarela de pago PayPal', 'Integrar la pasarela de pagos PayPal en el sistema de pagos en línea.', 2, 'La integración de PayPal está en progreso. A la espera de las credenciales de la API.', 1, 2);

-- tickets fina pro 1
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Test de funcionalidad de carrito', 'Realizar pruebas unitarias y de integración para la funcionalidad del carrito de compras.', 3, 'Las pruebas han sido exitosas y la funcionalidad está operativa.', 1, 1);
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Test y optimización de historial de compras', 'Realizar pruebas y optimizaciones para la página de historial de compras del usuario.', 3, 'El historial de compras está optimizado y probado. La funcionalidad es estable.', 1, 3);



-- Tickets en Proceso para el Proyecto 2
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar funcionalidad de visualización de stock', 'Desarrollar la funcionalidad para visualizar el stock disponible en tiempo real en la plataforma de inventarios.', 2, 'El desarrollo está en curso y ya se implementaron las primeras etapas de integración con la base de datos.', 1, 4),
('Crear formulario de agregar productos', 'Desarrollar el formulario para agregar nuevos productos al inventario, incluyendo categorías y cantidad.', 2, 'Se está trabajando en la interfaz del formulario y la validación de datos.', 1, 5);

-- Tickets Finalizados para el Proyecto 2
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Test de visualización de stock', 'Realizar pruebas de carga y rendimiento para la página de visualización del stock disponible.', 3, 'Las pruebas de carga fueron satisfactorias y la página está funcionando correctamente.', 1, 4),
('Optimización de movimiento de inventario', 'Optimizar la funcionalidad de movimientos de inventario, incluyendo entradas y salidas de productos.', 3, 'La optimización fue completada y ahora el sistema maneja de manera eficiente los movimientos de inventario.', 1, 6);

-- Tickets en Proceso para el Proyecto 3
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Desarrollar formulario de creación de ticket', 'Desarrollar el formulario para que los usuarios puedan crear tickets de soporte, con descripción y prioridad.', 2, 'El formulario ya está en desarrollo y la base de datos está estructurada para almacenar los tickets.', 1, 7),
('Crear asignación automática de tickets', 'Desarrollar la funcionalidad que asigne automáticamente los tickets creados a los agentes de soporte disponibles.', 2, 'La asignación automática ya está en su fase de prueba, en espera de la configuración final de los agentes.', 1, 8);

-- Tickets Finalizados para el Proyecto 3
INSERT INTO tickets (titulo, descripcion, estado, comentario, creado_por, id_historia)
VALUES
('Test de historial de tickets', 'Realizar pruebas de visualización del historial de tickets del usuario, con filtros de estado y fecha.', 3, 'El historial de tickets fue probado y los filtros de búsqueda funcionan correctamente.', 1, 9),
('Desarrollar funcionalidad de cancelación de tickets', 'Implementar la opción de cancelar tickets de soporte desde la interfaz del usuario.', 3, 'La funcionalidad de cancelación fue completada y ahora los usuarios pueden cancelar sus tickets desde la plataforma.', 1, 9);


