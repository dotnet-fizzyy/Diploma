using FluentValidation;
using FluentValidation.Validators;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class AuthenticationUserValidator : AbstractValidator<AuthenticationUser>
    {
        public AuthenticationUserValidator()
        {
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .NotEmpty()
                .EmailAddress(EmailValidationMode.Net4xRegex)
                .WithMessage("Provided email is not valid");
        }
    }
}