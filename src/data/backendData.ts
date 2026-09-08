import { BackendComparison } from '../types.ts';

export const BACKEND_COMPARISONS: Record<string, BackendComparison> = {
  dotnet: {
    id: 'dotnet',
    name: '.NET 8 (C#)',
    tagline: 'Alta performance, tipagem estrita com Entity Framework Core e Minimal APIs',
    accentColor: 'text-purple-400',
    model: {
      filename: 'Models/User.cs',
      lang: 'csharp',
      explanation: 'Entidade de banco de dados com anotações de validação e mapeamento para PostgreSQL/SQL Server via EF Core.',
      code: `using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeCompare.Models;

[Table("users")]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;
}`
    },
    controller: {
      filename: 'Controllers/UsersController.cs',
      lang: 'csharp',
      explanation: 'Controller REST clássico com injeção de dependência do DbContext e tratamento assíncrono.',
      code: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeCompare.Data;
using CodeCompare.Models;

namespace CodeCompare.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<UsersController> _logger;

    // Injeção de dependência do contexto do banco
    public UsersController(AppDbContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // POST: api/users (Criação de usuário)
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
    }
}`
    },
    route: {
      endpoint: 'GET /api/users',
      lang: 'csharp',
      explanation: 'Endpoint assíncrono com paginação, filtro de usuários ativos e AsNoTracking() para máxima velocidade.',
      code: `// GET: api/users?page=1&pageSize=20
[HttpGet]
[ProducesResponseType(StatusCodes.Status200OK)]
public async Task<ActionResult<IEnumerable<User>>> GetUsers(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20)
{
    _logger.LogInformation("Consultando usuários no banco de dados.");

    // AsNoTracking() desativa o tracking do EF Core para queries de leitura rápida
    var users = await _context.Users
        .AsNoTracking()
        .Where(u => u.IsActive)
        .OrderByDescending(u => u.CreatedAt)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Ok(users);
}`
    }
  },
  java: {
    id: 'java',
    name: 'Java (Spring Boot 3)',
    tagline: 'Arquitetura robusta corporativa com Spring Data JPA, Hibernate e Java 21',
    accentColor: 'text-orange-400',
    model: {
      filename: 'src/main/java/com/codecompare/model/User.java',
      lang: 'java',
      explanation: 'Entidade JPA com Jakarta Persistence mapeando chave primária auto-incrementada e auditoria.',
      code: `package com.codecompare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false, length = 100)
    private String name;

    @Email
    @NotBlank(message = "O email é obrigatório")
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_active")
    private Boolean isActive = true;

    // Construtores, Getters e Setters
    public User() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}`
    },
    controller: {
      filename: 'src/main/java/com/codecompare/controller/UserController.java',
      lang: 'java',
      explanation: 'Controller com anotação @RestController, injeção de UserRepository e tratamento de status HTTP.',
      code: `package com.codecompare.controller;

import com.codecompare.model.User;
import com.codecompare.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    // Injeção de dependência por construtor (boa prática Spring)
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}`
    },
    route: {
      endpoint: 'GET /api/users',
      lang: 'java',
      explanation: 'Endpoint paginado usando Pageable do Spring Data JPA com busca filtrada por status ativo.',
      code: `// GET /api/users?page=0&size=20
@GetMapping
public ResponseEntity<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {

    // Spring Data PageRequest para paginação nativa no banco
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    
    // Consulta otimizada com query derivada no repositório
    Page<User> users = userRepository.findByIsActiveTrue(pageable);
    
    return ResponseEntity.ok(users);
}`
    }
  },
  python: {
    id: 'python',
    name: 'Python (FastAPI)',
    tagline: 'Velocidade moderna com tipagem assíncrona (AsyncIO), Pydantic v2 e SQLAlchemy',
    accentColor: 'text-blue-400',
    model: {
      filename: 'app/models/user.py',
      lang: 'python',
      explanation: 'Modelos ORM com SQLAlchemy DeclarativeBase + Schemas de validação e serialização do Pydantic.',
      code: `from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, EmailStr

Base = declarative_base()

# Modelo de Banco de Dados (SQLAlchemy)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

# Schema de Saída para a API (Pydantic v2)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True`
    },
    controller: {
      filename: 'app/routers/users.py',
      lang: 'python',
      explanation: 'Router do FastAPI com injeção de dependência da sessão de banco (AsyncSession).',
      code: `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import UserModel, UserResponse, UserCreate

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate, 
    db: AsyncSession = Depends(get_db)
):
    # Criação do usuário no banco com transação assíncrona
    new_user = UserModel(**payload.model_dump())
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user`
    },
    route: {
      endpoint: 'GET /api/users',
      lang: 'python',
      explanation: 'Consulta assíncrona com SQLAlchemy select(), limit e offset para resposta em milissegundos.',
      code: `@router.get("/", response_model=list[UserResponse])
async def get_users(
    skip: int = 0, 
    limit: int = 20, 
    db: AsyncSession = Depends(get_db)
):
    """
    Retorna a lista paginada de usuários ativos conectados ao banco PostgreSQL.
    """
    query = (
        select(UserModel)
        .where(UserModel.is_active == True)
        .order_by(UserModel.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    
    result = await db.execute(query)
    users = result.scalars().all()
    
    return users`
    }
  },
  go: {
    id: 'go',
    name: 'Go (Fiber / GORM)',
    tagline: 'Binário único ultra leve, baixa latência e concorrência nativa com Goroutines',
    accentColor: 'text-cyan-400',
    model: {
      filename: 'models/user.go',
      lang: 'go',
      explanation: 'Struct Go com tags GORM para migração de schema e tags JSON para serialização da API.',
      code: `package models

import (
	"time"
)

// User representa a tabela no banco de dados
type User struct {
	ID        uint      \`gorm:"primaryKey" json:"id"\`
	Name      string    \`gorm:"size:100;not null" json:"name"\`
	Email     string    \`gorm:"size:150;uniqueIndex;not null" json:"email"\`
	IsActive  bool      \`gorm:"default:true" json:"is_active"\`
	CreatedAt time.Time \`json:"created_at"\`
	UpdatedAt time.Time \`json:"updated_at"\`
}`
    },
    controller: {
      filename: 'handlers/user_handler.go',
      lang: 'go',
      explanation: 'Handler com Fiber Ctx e GORM DB manipulando binding de payload e erros HTTP idiomáticos.',
      code: `package handlers

import (
	"codecompare/database"
	"codecompare/models"
	"github.com/gofiber/fiber/v2"
)

// CreateUser cadastra um novo usuário
func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Dados inválidos",
		})
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}`
    },
    route: {
      endpoint: 'GET /api/users',
      lang: 'go',
      explanation: 'Consulta paginada usando métodos encadeados do GORM (Where, Order, Offset, Limit, Find).',
      code: `// GetUsers busca a lista de usuários no banco de dados
func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	
	// Leitura de parâmetros de query com valores padrão
	page := c.QueryInt("page", 1)
	pageSize := c.QueryInt("pageSize", 20)
	offset := (page - 1) * pageSize

	// Executa a query com conexão persistida no pool do banco
	result := database.DB.
		Where("is_active = ?", true).
		Order("created_at desc").
		Offset(offset).
		Limit(pageSize).
		Find(&users)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Falha ao buscar usuários no banco",
		})
	}

	return c.JSON(users)
}`
    }
  }
};
