'use client';
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Define the type for the JSON data structure
interface IncidentData {
  caller_info: {
    name: string;
    location: string;
  };
  incident_details: {
    incident_type: string;
    incident_location: {
      address: string;
      landmark?: string | null;
      specifics?: string | null;
    };
    time: string;
    nature_of_emergency: string;
    severity: string;
    priority_level: number;
    number_of_people_involved: number;
    injuries_or_symptoms?: string | null;
    description_of_events: string;
    special_circumstances: string;
  };
  additional_info: {
    caller_positioning: string;
    suspect_or_vehicle_description?: string | null;
    bystanders_present: string;
  };
  response_requirements: {
    required_resources: string;
    urgency: string;
  };
  suggestions_for_deployment: {
    who_to_deploy: string;
    how_to_help: string;
  };
}

// Component that accepts incident data as a prop
interface ChatProps {
  incident: IncidentData;
}

export default function Chat({ incident }: ChatProps) {
  // Destructure the incident data for easier access
  const {
    caller_info,
    incident_details,
    additional_info,
    response_requirements,
    suggestions_for_deployment,
  } = incident;

  return (
    <>
      <div className="flex-grow p-4 overflow-y-auto">
        <Card className="w-full h-full flex flex-grow flex-col">
          <CardHeader>
            <CardTitle>Emergency Incident Report</CardTitle>
            <CardDescription>Details of the reported incident.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              {/* Caller Information */}
              <div className="flex flex-col space-y-1.5">
                <Label>Caller Name:</Label>
                <p><strong>{caller_info.name ?? "Unknown"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Caller Location:</Label>
                <p><strong>{caller_info.location ?? "N/A"}</strong></p>
              </div>

              {/* Incident Details */}
              <div className="flex flex-col space-y-1.5">
                <Label>Incident Type:</Label>
                <p><strong>{incident_details.incident_type ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Incident Location:</Label>
                <p><strong>{incident_details.incident_location.address ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Time:</Label>
                <p><strong>{incident_details.time ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Nature of Emergency:</Label>
                <p><strong>{incident_details.nature_of_emergency ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Severity:</Label>
                <p><strong>{incident_details.severity ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Number of People Involved:</Label>
                <p><strong>{incident_details.number_of_people_involved ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Description of Events:</Label>
                <p><strong>{incident_details.description_of_events ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Special Circumstances:</Label>
                <p><strong>{incident_details.special_circumstances ?? "N/A"}</strong></p>
              </div>

              {/* Additional Information */}
              <div className="flex flex-col space-y-1.5">
                <Label>Caller Positioning:</Label>
                <p><strong>{additional_info.caller_positioning ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Suspect or Vehicle Description:</Label>
                <p><strong>{additional_info.suspect_or_vehicle_description ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Bystanders Present:</Label>
                <p><strong>{additional_info.bystanders_present ?? "N/A"}</strong></p>
              </div>

              {/* Response Requirements */}
              <div className="flex flex-col space-y-1.5">
                <Label>Required Resources:</Label>
                <p><strong>{response_requirements.required_resources ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Urgency:</Label>
                <p><strong>{response_requirements.urgency ?? "N/A"}</strong></p>
              </div>

              {/* Suggestions for Deployment */}
              <div className="flex flex-col space-y-1.5">
                <Label>Who to Deploy:</Label>
                <p><strong>{suggestions_for_deployment.who_to_deploy ?? "N/A"}</strong></p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>How to Help:</Label>
                <p><strong>{suggestions_for_deployment.how_to_help ?? "N/A"}</strong></p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Close</Button>
            <Button>Deploy Resources</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}