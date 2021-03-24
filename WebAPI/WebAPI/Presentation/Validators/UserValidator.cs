using FluentValidation;
using FluentValidation.Validators;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
#pragma warning disable 618
                .EmailAddress(EmailValidationMode.Net4xRegex)
#pragma warning restore 618
                .WithMessage("Provided email is not valid");
        }
    }
}