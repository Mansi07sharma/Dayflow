import React from "react";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Mail, Phone, Building, MapPin, FileText, Lock, DollarSign, Shield, Award, Plus ,} from "lucide-react";
import Button from "../ui/Button";
import Layout from "../ui/Layout";
export default function ProfilePage() {
  const skills = ["React", "Node.js", "Python"];
  const certifications = ["AWS Certified Developer", "Scrum Master"];
  return (
       <Layout>
      {/* Profile Header */}
      <div className="section-card mb-6">
        <div className="profile-header flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              className="h-28 w-28"
            />
            {/* <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center">
              <Camera className="h-4 w-4" />
            </button> */}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-muted-foreground">System Administrator</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>admin@hrms.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>HRMS Corp</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York</span>
              </div>
            </div>
          </div>

          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="resume" className="mt-6">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-2 h-auto p-0">
            <TabsTrigger value="resume">
              <FileText className="h-4 w-4 mr-2" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="private">
              <Lock className="h-4 w-4 mr-2" />
              Private Info
            </TabsTrigger>
            <TabsTrigger value="salary">
              <DollarSign className="h-4 w-4 mr-2" />
              Salary Info
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="resume">
            <p className="text-sm text-muted-foreground mt-4">Resume content here...</p>
          </TabsContent>
          <TabsContent value="private">
            <p className="text-sm text-muted-foreground mt-4">Private info content here...</p>
          </TabsContent>
          <TabsContent value="salary">
            <p className="text-sm text-muted-foreground mt-4">Salary info content here...</p>
          </TabsContent>
          <TabsContent value="security">
            <p className="text-sm text-muted-foreground mt-4">Security info content here...</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* About, Job, Hobbies */}
      <div className="space-y-6">
        <div className="section-card">
          <h3 className="font-semibold mb-4">About</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Passionate software engineer with 5+ years of experience in building scalable web applications. 
            Specialized in React, TypeScript, and cloud technologies. Strong advocate for clean code and best practices.
          </p>
        </div>

        <div className="section-card">
          <h3 className="font-semibold mb-4">What I Love About My Job</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Building innovative solutions that make a real impact. Collaborating with talented teams and 
            continuously learning new technologies.
          </p>
        </div>

        <div className="section-card">
          <h3 className="font-semibold mb-4">Interests & Hobbies</h3>
          <p className="text-muted-foreground text-sm">
            Reading, Hiking, Photography, Open Source Contribution
          </p>
        </div>

        {/* Skills */}
        <div className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Skills</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-1.5 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Certifications</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-4 bg-secondary/50 rounded-lg p-4">
                <div className="icon-box icon-box-accent">
                  <Award className="h-5 w-5" />
                </div>
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>

  );
}
