package com.db.library.dto

import org.jetbrains.annotations.Nullable
import java.time.LocalDate
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class AuthorDTO(
    @Size(max = 50)
    @NotNull
    var firstName: String,
    @Size(max = 50)
    @NotNull
    var lastName: String,
    @Size(max = 50)
    @Nullable
    var patronymic: String?,
    @NotNull
    var birthDate: LocalDate,
    @Nullable
    var deathDate: LocalDate?,
)