"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Moon, Palette, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsView() {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-fg)]">Settings</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your account preferences and notifications
            </p>
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  MD
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-fg)]">Wiktoria</h3>
                  <p className="text-sm text-slate-500">Mathematics Teacher</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Margaret" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Wiktoria" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="m.davis@school.edu" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="math">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate mathematics educator with 8 years of experience teaching algebra and calculus. Love helping students discover the beauty of math!"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notif" className="text-base">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-slate-500">
                          Receive email updates about grades, assignments, and messages
                        </p>
                      </div>
                      <Switch
                        id="email-notif"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notif" className="text-base">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-slate-500">
                          Get instant alerts on your device
                        </p>
                      </div>
                      <Switch
                        id="push-notif"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="parent-messages" className="text-base">
                          Parent Messages
                        </Label>
                        <p className="text-sm text-slate-500">
                          Notify me when parents send messages
                        </p>
                      </div>
                      <Switch id="parent-messages" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="grade-reminders" className="text-base">
                          Grading Reminders
                        </Label>
                        <p className="text-sm text-slate-500">
                          Remind me about pending assignments to grade
                        </p>
                      </div>
                      <Switch id="grade-reminders" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-summary" className="text-base">
                          Weekly Summary
                        </Label>
                        <p className="text-sm text-slate-500">
                          Receive a weekly digest of class performance
                        </p>
                      </div>
                      <Switch id="weekly-summary" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notification-time">Quiet Hours</Label>
                  <p className="text-sm text-slate-500 mb-2">
                    Don&apos;t send notifications during these times
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start" className="text-xs">Start Time</Label>
                      <Input id="quiet-start" type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end" className="text-xs">End Time</Label>
                      <Input id="quiet-end" type="time" defaultValue="07:00" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-4 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode" className="text-base flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark Mode
                        </Label>
                        <p className="text-sm text-slate-500">
                          Switch to a darker color scheme
                        </p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <Select defaultValue="blue">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sidebar-position">Sidebar Position</Label>
                      <Select defaultValue="left">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-2 block">Dashboard Layout</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 transition">
                      <div className="space-y-2">
                        <div className="h-16 bg-blue-200 rounded" />
                        <div className="h-8 bg-blue-200 rounded" />
                      </div>
                      <p className="text-xs font-medium mt-2 text-blue-900">Compact</p>
                    </button>
                    <button className="p-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition">
                      <div className="space-y-2">
                        <div className="h-20 bg-slate-200 rounded" />
                        <div className="h-12 bg-slate-200 rounded" />
                      </div>
                      <p className="text-xs font-medium mt-2 text-slate-600">Comfortable</p>
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Password & Security
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Button variant="outline" className="w-full">
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="two-factor" className="text-base">
                      Two-Factor Authentication
                    </Label>
                    <Switch id="two-factor" />
                  </div>
                  <p className="text-sm text-slate-500">
                    Add an extra layer of security to your account
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-fg)] mb-3">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-[var(--color-fg)]">
                          Chrome on Windows
                        </p>
                        <p className="text-xs text-slate-500">Current session • Active now</p>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Current
                      </Button>
                    </div>
                    <div className="p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-[var(--color-fg)]">
                          Safari on iPhone
                        </p>
                        <p className="text-xs text-slate-500">Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="destructive" className="w-full">
                  Sign Out of All Devices
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </section>
  );
}
