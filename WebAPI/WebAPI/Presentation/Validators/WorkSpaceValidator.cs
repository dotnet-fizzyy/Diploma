using FluentValidation;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class WorkSpaceValidator : AbstractValidator<WorkSpace>
    {
        public WorkSpaceValidator()
        {
            RuleFor(x => x.WorkSpaceName)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .NotEmpty()
                .WithMessage("WorkSpace name is required");
        }
    }
}