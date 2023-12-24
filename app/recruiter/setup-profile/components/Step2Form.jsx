"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useUser } from "@/context/UserProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Step2Form({
  formik,
  handleCompleteStep2,
  handleBackToStep1,
}) {
  const { user } = useUser();
  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="mx-auto max-w-3xl">
        <div className=" flex justify-center border-b border-neutral-200 px-8 py-4 text-2xl font-semibold text-accent-foreground">
          <h2 className="text-center text-lg font-semibold text-neutral-700 sm:text-left md:text-2xl">
            Set up your company profile
          </h2>
        </div>
        <div className="els-start flex flex-col justify-start gap-1 p-4 sm:p-8">
          <p className="text-base font-medium text-accent-foreground">
            Step 2/2
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-2/4 rounded-lg bg-input p-1" />
            <span className="h-2 w-2/4 rounded-lg bg-primary p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Company Website Link<span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="website"
                name="website"
                placeholder="e.g. Google"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.website}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Linkedin Profile Link <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="linkedin_link"
                name="linkedin_link"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_link}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Company Slogan <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="slogan"
                name="slogan"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.slogan}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              About Your Company <span className="text-destructive">*</span>
            </p>
            <div>
              <Textarea
                id="about_us"
                name="about_us"
                placeholder="e.g. Dhaka, Bangladesh"
                rows="5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about_us}
              />
            </div>
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToStep1}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
              {user?.isOnboardComplete ? (
                <Button type="button" disabled>
                  Setup Completed
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
                  onClick={() => handleCompleteStep2(formik.values)}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
