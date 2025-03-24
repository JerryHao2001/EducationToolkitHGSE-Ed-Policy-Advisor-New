import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SwotAnalysisData } from "@/lib/types";

const swotAnalysisSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(10, "Please describe your project in more detail"),
  strengths: z.string().min(10, "Please add more details to the strengths section"),
  weaknesses: z.string().min(10, "Please add more details to the weaknesses section"),
  opportunities: z.string().min(10, "Please add more details to the opportunities section"),
  threats: z.string().min(10, "Please add more details to the threats section"),
});

interface SwotAnalysisFormProps {
  onSubmit: (data: SwotAnalysisData) => void;
  isSubmitting: boolean;
}

const SwotAnalysisForm = ({ onSubmit, isSubmitting }: SwotAnalysisFormProps) => {
  const form = useForm<SwotAnalysisData>({
    resolver: zodResolver(swotAnalysisSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      strengths: "",
      weaknesses: "",
      opportunities: "",
      threats: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Information</h3>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Project Name:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter project name" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Project Description:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of your project or initiative" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <FormField
              control={form.control}
              name="strengths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-blue-700 mb-3">Strengths</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the internal strengths of your project or organization" 
                      rows={6}
                      className="border-gray-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <FormField
              control={form.control}
              name="weaknesses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-red-700 mb-3">Weaknesses</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the internal weaknesses of your project or organization" 
                      rows={6}
                      className="border-gray-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <FormField
              control={form.control}
              name="opportunities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-green-700 mb-3">Opportunities</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the external opportunities for your project or organization" 
                      rows={6}
                      className="border-gray-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <FormField
              control={form.control}
              name="threats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-yellow-700 mb-3">Threats</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the external threats to your project or organization" 
                      rows={6}
                      className="border-gray-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate SWOT Analysis"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SwotAnalysisForm;
