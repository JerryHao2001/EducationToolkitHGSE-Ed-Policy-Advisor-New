import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LogicFrameworkData } from "@/lib/types";

const logicFrameworkSchema = z.object({
  organization: z.string().min(1, "Organization name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Please enter a valid email"),
  problem: z.string().min(10, "Please describe the problem in more detail"),
  goal: z.string().min(10, "Please describe your goal in more detail"),
  targetGroup: z.string().min(5, "Please describe your target group"),
  action1: z.string().min(3, "Action 1 is required"),
  action2: z.string().min(3, "Action 2 is required"),
  action3: z.string().min(3, "Action 3 is required"),
  successIndicators: z.string().min(10, "Please describe your success indicators in more detail"),
  challenges: z.string().optional(),
});

interface LogicFrameworkFormProps {
  onSubmit: (data: LogicFrameworkData) => void;
  isSubmitting: boolean;
}

const LogicFrameworkForm = ({ onSubmit, isSubmitting }: LogicFrameworkFormProps) => {
  const form = useForm<LogicFrameworkData>({
    resolver: zodResolver(logicFrameworkSchema),
    defaultValues: {
      organization: "",
      contact: "",
      email: "",
      problem: "",
      goal: "",
      targetGroup: "",
      action1: "",
      action2: "",
      action3: "",
      successIndicators: "",
      challenges: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">1. Basic Info</h3>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Organization Name:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter organization name" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Contact Person:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter contact person" 
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email:</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter email" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">2. What Problem Are You Solving?</h3>
          
          <div>
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Problem:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the main challenge in one sentence..." 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">3. What Do You Want to Achieve?</h3>
          
          <div>
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Goal:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What do you want to achieve?" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">4. Who Are You Helping?</h3>
          
          <div>
            <FormField
              control={form.control}
              name="targetGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Target Group:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Who are you helping?" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">5. Key Actions You'll Take</h3>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="action1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Action 1:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Key Action 1" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="action2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Action 2:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Key Action 2" 
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
              name="action3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Action 3:</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Key Action 3" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">6. How Will You Know It's Working?</h3>
          
          <div>
            <FormField
              control={form.control}
              name="successIndicators"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Success Indicators:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How will you know it's working?" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">7. Biggest Challenge or Risk (Optional)</h3>
          
          <div>
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Challenges/Risks:</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe challenges or risks (optional)" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            style={{ backgroundColor: "#A51C30" }}
            className="px-4 py-2 text-white hover:bg-opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate Logic Framework"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LogicFrameworkForm;
