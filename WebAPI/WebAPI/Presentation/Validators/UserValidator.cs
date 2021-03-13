using FluentValidation;
using FluentValidation.Validators;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty()
                .When(x => x.RecordVersion != default);
            RuleFor(x => x.RecordVersion)
                .NotEmpty()
                .When(x => x.UserId != default);
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress(EmailValidationMode.Net4xRegex)
                .WithMessage("Provided email is not valid");
        }
    }
}