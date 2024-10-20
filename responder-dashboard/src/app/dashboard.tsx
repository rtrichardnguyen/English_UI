"use client";
import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Chat from "@/components/chat";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Utility function to map priority to color classes
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "0":
      return "bg-red-500"; // Critical priority
    case "1":
      return "bg-orange-500"; // High priority
    case "2":
      return "bg-yellow-500"; // Medium priority
    case "3":
      return "bg-purple-500"; // Low priority
    case "4":
      return "bg-teal-500"; // Very low priority
    default:
      return "bg-gray-300"; // Default color
  }
};

export function Dashboard() {
  // State for selected incident
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  // Hardcoded call details including the new incident
  const hardcodedCallDetails = [
    {
      who: "Victor Nguyen",
      what: "System Outage",
      when: "2024-10-20T15:30",
      priority: "1",
      description: "There was a system outage affecting people",
      fullData: {
        who: "John Doe",
        what: "System Outage",
        when: "2024-10-20T15:30",
        priority: "1",
        description: "There was a system outage affecting people",
      },
    },
    {
      who: "Sandra Le",
      what: "Burglary",
      when: "2024-10-19T11:45",
      priority: "2",
      description: "Burglary reported at the local grocery store.",
      fullData: {
        who: "Jane Smith",
        what: "Burglary",
        when: "2024-10-19T11:45",
        priority: "2",
        description: "Burglary reported at the local grocery store.",
      },
    },
    {
      who: "Michael Binyam",
      what: "Cat Stuck in Tree",
      when: "2024-10-18T09:20",
      priority: "3",
      description: "Cat stuck in tree, unable to get down.",
      fullData: {
        who: "Michael Brown",
        what: "Cat Stuck in Tree",
        when: "2024-10-18T09:20",
        priority: "3",
        description: "Cat stuck in tree, unable to get down.",
      },
    },
    {
      who: "Richard Nguyen",
      what: "Fire Outbreak",
      when: "2024-09-14T13:45",
      priority: "1",
      description: "Fire started on the third floor; multiple people are trapped inside.",
      fullData: {
        caller_info: {
          name: "Richard Nguyen",
          location: "Main Street, Building 12",
        },
        incident_details: {
          incident_type: "Fire Outbreak",
          incident_location: {
            address: "Main Street, Building 12",
            landmark: "Near the grocery store",
            specifics: "Third Floor",
          },
          time: "2024-09-14T13:45:00",
          nature_of_emergency: "Building fire, smoke visible",
          severity: "Severe",
          priority_level: 1,
          number_of_people_involved: 5,
          injuries_or_symptoms: "Burns, smoke inhalation",
          description_of_events: "Fire started on the third floor; multiple people are trapped inside.",
          special_circumstances: "Access to building is limited",
        },
        additional_info: {
          caller_positioning: "On the street across from the building",
          suspect_or_vehicle_description: null,
          bystanders_present: "Yes, crowd gathering",
          background_noise_or_indications: "Screams and fire alarms",
          language_or_accessibility_needs: "None",
          history_or_repeat_calls: "First call regarding this incident",
        },
        response_requirements: {
          required_resources: "Firefighters, ambulance, police",
          urgency: "High",
        },
        suggestions_for_deployment: {
          who_to_deploy: "Deploy firefighters and emergency medical services, cordon off the area with police",
          how_to_help: "Evacuate the building, extinguish the fire, and provide medical assistance",
        },
      },
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col w-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="flex justify-center items-start w-1/3">
              <div className="w-[80%] flex flex-col space-y-4">
                {hardcodedCallDetails.map((details, index) => {
                  const [date, time] = details.when.split("T"); // Split date and time
                  return (
                    <Card
                      key={index}
                      className="w-full h-40 relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedIncident(details.fullData)} // Handle card click
                    >
                      <CardHeader className="relative">
                        <div className="flex items-center">
                          <CardTitle>{details.who}</CardTitle>
                          <span
                            className={`inline-block ml-2 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center ${getPriorityColor(
                              details.priority
                            )}`}
                          >
                            {details.priority}
                          </span>
                        </div>
                        <div className="absolute top-0 right-0 text-sm text-gray-500 p-2 flex flex-col items-end">
                          <div>{date}</div>
                          <div className="text-right">{time}</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col">
                          <div className="font-bold">{details.what}</div>
                          <div>{details.description}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="absolute bottom-2 right-2"></CardFooter>
                    </Card>
                  );
                })}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex items-start w-2/3">
              <div className="w-full">
                {selectedIncident ? (
                  <Chat incident={selectedIncident} />
                ) : (
                  <p>Select an incident to view details</p>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </TooltipProvider>
  );
}
